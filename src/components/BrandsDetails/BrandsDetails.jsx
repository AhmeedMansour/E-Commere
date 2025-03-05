import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";

export default function BrandsDetails() {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  async function getSpecificBrand() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${params.id}`
      );
      setBrandData(data?.data); 
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSpecificBrand();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <DotLoader color="#0AAD0A" />
        </div>
      ) : brandData ? ( 
        <div className="container mx-auto py-3 px-6">
          <div className="flex flex-col items-center">
            <img
              className="p-2 rounded-lg w-fit h-[300px] object-cover"
              src={brandData.image} 
              alt={brandData.name}
            />
            <h2 className="text-3xl font-bold mt-4">{brandData.name}</h2>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Brand not found.</p>
      )}
    </>
  );
}
