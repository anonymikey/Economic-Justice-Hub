from pathlib import Path
import fitz

pdf_path = Path("attached_assets/ECONOMIC_JUSTICE_FORUM_INSTITUTIONAL_PROFILE_1789328349377.pdf")
output_dir = Path(".agents/outputs/ejf-profile")
pages_dir = output_dir / "pages"
images_dir = output_dir / "embedded-images"
pages_dir.mkdir(parents=True, exist_ok=True)
images_dir.mkdir(parents=True, exist_ok=True)

document = fitz.open(pdf_path)
print(f"pages={document.page_count}")

for page_number, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    page_path = pages_dir / f"page-{page_number:02d}.png"
    pixmap.save(page_path)

    image_count = 0
    for image_index, image_info in enumerate(page.get_images(full=True), start=1):
        xref = image_info[0]
        extracted = document.extract_image(xref)
        extension = extracted["ext"]
        image_path = images_dir / f"page-{page_number:02d}-image-{image_index:02d}.{extension}"
        image_path.write_bytes(extracted["image"])
        image_count += 1
    print(f"page={page_number} images={image_count} rendered={page_path}")