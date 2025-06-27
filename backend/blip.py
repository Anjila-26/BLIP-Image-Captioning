import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch

from io import BytesIO

app = FastAPI(title="Blip for Image Captioning")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


class ImageLinkRequest(BaseModel):
    image_link: str


def create_caption(img: Image.Image) -> str:
    img = img.convert("RGB")
    inputs = processor(img, return_tensors="pt")
    inputs = {key: tensor.to(device) for key, tensor in inputs.items()}
    generated_ids = model.generate(**inputs)
    caption_text = processor.decode(generated_ids[0], skip_special_tokens=True)
    return caption_text


@app.post("/caption/upload")
async def caption_from_file(uploaded_file: UploadFile = File(...)):
    try:
        file_bytes = await uploaded_file.read()
        img = Image.open(BytesIO(file_bytes)).convert("RGB")
        caption_result = create_caption(img)
        return {"caption": caption_result}
    except Exception as exc:
        return {"error": str(exc)}


@app.post("/caption/link")
async def caption_from_link(request_data: ImageLinkRequest):
    try:
        response = requests.get(request_data.image_link, stream=True)
        response.raise_for_status()
        img = Image.open(response.raw).convert("RGB")
        caption_result = create_caption(img)
        return {"caption": caption_result}
    except Exception as exc:
        return {"error": str(exc)}
