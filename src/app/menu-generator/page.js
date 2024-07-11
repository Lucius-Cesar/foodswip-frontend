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
  const [maxFoodPerCategory, setMaxFoodPerCategory] = useState(null);
  const [menu, setMenu] = useState(null);
  const [menuImgUrl, setMenuImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
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
            <label className="font-medium">
              Maximum de plats par catégories (ne rien mettre par défaut){" "}
            </label>
            <InputNumber
              onChange={(input) => setMaxFoodPerCategory(input)}
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
            download={`menu_${slug}.jpg`}
          >
            {" "}
          </a>
        </form>
        {menu && (
          <div className="h-[1850px] w-[1146px]" ref={menuImgRef}>
            <MenuForFlyers
              menu={menu}
              maxFoodPerCategory={maxFoodPerCategory}
              categoriesToDelete={categoriesToDelete}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default page;
