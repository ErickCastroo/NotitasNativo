import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import MasonryList from "react-native-masonry-list";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from 'react-i18next';
import i18next from '../config/lang/services/i18next';
import tw from "twrnc";

const images = [
  {
    uri: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    dimensions: { width: 500, height: 750 },
  },
  {
    uri: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    dimensions: { width: 600, height: 400 },
  },
  {
    uri: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    dimensions: { width: 400, height: 600 },
  },
  {
    uri: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
    dimensions: { width: 600, height: 400 },
  },
  {
    uri: "https://images.unsplash.com/photo-1533689453669-7c387a6ddc18",
    dimensions: { width: 400, height: 600 },
  },
  {
    uri: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    dimensions: { width: 500, height: 750 },
  },
  {
    uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    dimensions: { width: 600, height: 400 },
  },
  {
    uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    dimensions: { width: 400, height: 600 },
  },
  {
    uri: "https://images.unsplash.com/photo-1517777189850-3d436410b937",
    dimensions: { width: 500, height: 750 },
  },
];

const getColumnsCount = (width) => {
  if (width < 350) return 1;
  if (width < 750) return 2;
  if (width < 900) return 3;
  return 4;
};

export default function Home() {
  const { t } = useTranslation();

  const [columns, setColumns] = useState(
    getColumnsCount(Dimensions.get("window").width)
  );

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnsCount(Dimensions.get("window").width));
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <View>
        <View style={tw`flex  mb-4 sm:mb-0`}>
          <View
            style={tw`text-2xl p-8 sm:text-3xl text-zinc-900 dark:text-zinc-100 font-bold mr-3`}
          >
            <Text>{t("title_notitas")}</Text>
          </View>
          <View style={tw`w-full h-full`}>
            <MasonryList
              images={images}
              style={tw`w-full  max-h-40vh border-2`}
              columns={columns}
              imageContainerStyle={{ borderRadius: 8, margin: 4 }}
            />
          </View>
        </View>
      </View>
    </I18nextProvider>
  );
}
