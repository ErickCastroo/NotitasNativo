import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import MasonryList from "react-native-masonry-list";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import i18next from "../config/lang/services/i18next";
import tw from "twrnc";

const notas = [
  {
    id: 1,
    titulo: "Nota 1",
    nota: "Contenido de la nota 1",
    color: null,
    dimensions: { width: 500, height: 200 },
  },
  {
    id: 2,
    titulo: "Nota 2",
    nota: "Contenido de la nota 2",
    color: "#ff0000",
    dimensions: { width: 600, height: 150 },
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

  const filteredNotas = notas.filter((notita) => notita.titulo && notita.nota && notita.dimensions);

  return (
    <I18nextProvider i18n={i18next}>
      <View>
        <View style={tw`flex mb-4 sm:mb-0`}>
          <View
            style={tw`text-2xl p-8 sm:text-3xl text-zinc-900 dark:text-zinc-100 font-bold mr-3`}
          >
            <Text>{t("title_notitas")}</Text>
          </View>
          <View style={tw`w-full h-full`}>
            <MasonryList
              images={filteredNotas.map((notita) => ({
                dimensions: notita.dimensions,
                id: notita.id,
                titulo: notita.titulo,
                nota: notita.nota,
                color: notita.color,
                onClick: () => {
                  console.log(`Clicked on ${notita.titulo}`);
                },
              }))}
              style={tw`w-full max-h-96 border-2 `}
              columns={columns}
              spacing={0.5}
              emptyView={<Text>No hay notas disponibles</Text>}
            />
          </View>
        </View>
      </View>
    </I18nextProvider>
  );
}


// renderIndividualHeader={(data) => (
//   <TouchableOpacity
//     key={data.id}
//     onPress={data.onClick}
//     style={[
//       tw`w-full border-2 rounded p-2 box-border overflow-hidden`,
//       {
//         borderColor: data.color || "zinc-900",
//         height: data.dimensions.height,
//       },
//     ]}
//   >
//     <Text style={tw`text-xl`}>{data.titulo}</Text>
//     <Text>{data.nota}</Text>
//   </TouchableOpacity>
// )}