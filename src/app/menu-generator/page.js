"use client";
import MenuForFlyers from "@/components/menu-generator/MenuForFlyers";
import html2canvas from "html2canvas";
import FormInput from "@/components/ui/FormInput";
import InputNumber from "@/components/ui/InputNumber";
import DefaultBtn from "@/components/ui/DefaultBtn";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
const page = () => {
  const [slug, setSlug] = useState(null);
  const [categoriesToDelete, setCategoriesToDelete] = useState("");
  const [foodsToDelete, setfoodsToDelete] = useState("");

  const [menu, setMenu] = useState(null);
  const [menuImgUrl, setMenuImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textSize, setTextSize] = useState("medium");
  const [cols, setCols] = useState(3);
  const [textAlignment, setTextAlignment] = useState("start");
  const menuImgRef = useRef(null);
  const menuDownloadRef = useRef(null);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/public/${slug}`
      );
      const restaurant = await response.json();

      setMenu(restaurant.menu);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  useEffect(() => {
    if (!menuImgRef.current || !menu) return;
    generateMenuImg();
  }, [menuImgRef.current, menu]);

  useEffect(() => {
    if (!menuImgUrl) return;
    menuDownloadRef.current.click();
  }, [menuImgUrl]);
  const generateMenuImg = async () => {
    const canvas = await html2canvas(menuImgRef.current);
    const menuImg = canvas.toDataURL("image/png");

    const base64Response = await fetch(menuImg);
    const blob = await base64Response.blob();
    // Create Blob URL
    const blobUrl = URL.createObjectURL(blob);
    setMenuImgUrl(blobUrl);
  };

  const handleTextSizeChange = (event) => {
    setTextSize(event.target.value);
  };

  const handleTextAlignmentChange = (event) => {
    setTextAlignment(event.target.value);
  };

  const handleGenerateAndDownloadMenu = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchMenu();

    setLoading(false);
  };
  return (
    <>
      <main>
        <form
          className="flex flex-col gap-4 p-4"
          onSubmit={(e) => handleGenerateAndDownloadMenu(e)}
        >
          <div className="w-40">
            <FormInput
              label="slug"
              placeholder="slug"
              onChange={(input) => setSlug(input)}
            ></FormInput>
          </div>

          <div className="w-96">
            <FormInput
              label="Catégories à supprimer (séparées par ;)"
              placeholder="exemple: Boissons;Sauces"
              onChange={(input) => setCategoriesToDelete(input)}
            ></FormInput>
          </div>

          <div className="w-96">
            <FormInput
              label="Plats à supprimer (séparés par ;)"
              placeholder="Tagliatelles aux fruits de mer;Gnocchi à la sauce pesto;"
              onChange={(input) => setfoodsToDelete(input)}
            ></FormInput>
          </div>
          <div>
            <label className="font-medium">Taille du texte</label>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="small"
                name="textSize"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                value="small"
                checked={textSize === "small"}
                onChange={handleTextSizeChange}
              />
              <label htmlFor="small">Petit</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="medium"
                name="textSize"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                value="medium"
                checked={textSize === "medium"}
                onChange={handleTextSizeChange}
              />
              <label htmlFor="medium">Moyen</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                id="large"
                name="textSize"
                value="large"
                checked={textSize === "large"}
                onChange={handleTextSizeChange}
              />
              <label htmlFor="large">Grand</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                id="extra-large"
                name="textSize"
                value="extra-large"
                checked={textSize === "extra-large"}
                onChange={handleTextSizeChange}
              />
              <label htmlFor="extra-large">XL</label>
            </div>
          </div>

          <div>
            <label className="font-medium">Alignement du texte</label>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="start"
                name="textAlignment"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                value="start"
                checked={textAlignment === "start"}
                onChange={handleTextAlignmentChange}
              />
              <label htmlFor="center">Début</label>
              <input
                type="radio"
                id="center"
                name="textAlignment"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
                value="center"
                checked={textAlignment === "center"}
                onChange={handleTextAlignmentChange}
              />
              <label htmlFor="center">Centré</label>
            </div>
          </div>
          <div className="w-44">
            <label className="font-medium">Nombre de colonnes</label>
            <InputNumber
              value={cols}
              onChange={(input) => {
                if (!input) setCols(1);
                else setCols(input);
              }}
            ></InputNumber>
          </div>
          <div>
            <DefaultBtn
              className="bg-primary"
              value="Générer Menu"
              type="submit"
              isLoading={loading}
            />
          </div>
          <a
            ref={menuDownloadRef}
            href={menuImgUrl ? menuImgUrl : "#"}
            download={`menu_${slug}.png`}
          ></a>
        </form>
        {menu && (
          <div className="h-[1800px] w-[1250px]" ref={menuImgRef}>
            <MenuForFlyers
              menu={menu}
              textSize={textSize}
              categoriesToDelete={categoriesToDelete}
              foodsToDelete={foodsToDelete}
              cols={cols}
              textAlignment={textAlignment}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default page;
