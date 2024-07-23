import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list"; // Importa la nueva biblioteca
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import i18next from "../config/lang/services/i18next";
import tw from "twrnc";
import { AddIcon } from "../components/Icons";
// Simula datos obtenidos de una API (reemplaza con tus datos reales)
const notas = [
  {
    id: 1,
    titulo: "Nota 1",
    nota: "Contenido de la nota 1Contenido de la nota 1Contenido de la nota 1Contenido de la nota 1Contenido de la nota 1Contenido de la nota 1Contenido de la nota 1",
    color: "#00ff00",
  },
  {
    id: 2,
    titulo: "Nota 2",
    nota: "Contenido de la nota 2Contenido de la nota 2Contenido de la nota 2Contenido de la nota 2Contenido de la nota 2",
    color: "#ff0000",
  },
  {
    id: 3,
    titulo: "Nota 3",
    nota: "Contenido de la nota 3. Más detalles sobre el contenido de esta nota para que sea más extensa.",
    color: "#0000ff",
  },
  {
    id: 4,
    titulo: "Nota 4",
    nota: "Contenido de la nota 4. Un texto extenso para demostrar la variación en el contenido de esta nota.",
    color: "#ffff00",
  },
  {
    id: 5,
    titulo: "Nota 5",
    nota: "Contenido de la nota 5. Aquí tienes una descripción detallada y extensa para esta nota en particular.",
    color: "#ff00ff",
  },
  {
    id: 6,
    titulo: "Nota 6",
    nota: "Contenido de la nota 6. Un texto más largo para demostrar cómo se verá en la aplicación.",
    color: "#00ffff",
  },
  {
    id: 7,
    titulo: "Nota 7",
    nota: "Contenido de la nota 7. Ejemplo de un contenido que ocupa un espacio considerable.",
    color: "#ff7f00",
  },
  {
    id: 8,
    titulo: "Nota 8",
    nota: "Contenido de la nota 8. Otro ejemplo de un texto más largo para llenar el espacio de la nota.",
    color: "#7f00ff",
  },
  {
    id: 9,
    titulo: "Nota 9",
    nota: "Contenido de la nota 9. Aquí tienes una breve descripción con contenido variado.",
    color: "#00ff7f",
  },
  {
    id: 10,
    titulo: "Nota 10",
    nota: "Contenido de la nota 10. Descripción extensa para que puedas ver cómo se muestra en la vista de la nota.",
    color: "#ff007f",
  },
  {
    id: 11,
    titulo: "Nota 11",
    nota: "Contenido de la nota 11. Texto largo que ayuda a llenar el espacio de la nota de manera efectiva.",
    color: "#7f7f00",
  },
  {
    id: 12,
    titulo: "Nota 12",
    nota: "Contenido de la nota 12. Un contenido variado y extenso para observar el diseño.",
    color: "#00ff00",
  },
  {
    id: 13,
    titulo: "Nota 13",
    nota: "Contenido de la nota 13. Ejemplo de una nota con mucho contenido para ver el ajuste en la vista.",
    color: "#ff0000",
  },
  {
    id: 14,
    titulo: "Nota 14",
    nota: "Contenido de la nota 14. Contenido largo para mostrar cómo se organiza en el diseño.",
    color: "#0000ff",
  },
  {
    id: 15,
    titulo: "Nota 15",
    nota: "Contenido de la nota 15. Un texto extendido para comprobar cómo se adapta a diferentes espacios.",
    color: "#ffff00",
  },
  {
    id: 16,
    titulo: "Nota 16",
    nota: "Contenido de la nota 16. Otra descripción extensa para ver la variación en el diseño.",
    color: "#ff00ff",
  },
  {
    id: 17,
    titulo: "Nota 17",
    nota: "Contenido de la nota 17. Ejemplo de una nota con mucho contenido para evaluar el formato.",
    color: "#00ffff",
  },
  {
    id: 18,
    titulo: "Nota 18",
    nota: "Contenido de la nota 18. Descripción larga que ayuda a llenar el espacio de manera óptima.",
    color: "#ff7f00",
  },
  {
    id: 19,
    titulo: "Nota 19",
    nota: "Contenido de la nota 19. Contenido extenso que se visualiza en el diseño de la aplicación.",
    color: "#7f00ff",
  },
  {
    id: 20,
    titulo: "Nota 20",
    nota: "Contenido de la nota 20. Un texto variado y largo para mostrar el ajuste en la visualización.",
    color: "#00ff7f",
  },
  {
    id: 21,
    titulo: "Nota 21",
    nota: "Contenido de la nota 21. Ejemplo de un contenido detallado para observar cómo se ajusta.",
    color: "#ff007f",
  },
  {
    id: 22,
    titulo: "Nota 22",
    nota: "Contenido de la nota 22. Otro texto largo para verificar la visualización en diferentes tamaños.",
    color: "#7f7f00",
  },
  {
    id: 23,
    titulo: "Nota 23",
    nota: "Contenido de la nota 23. Descripción extendida para comprobar el formato en el diseño.",
    color: "#00ff00",
  },
  {
    id: 24,
    titulo: "Nota 24",
    nota: "Contenido de la nota 24. Texto largo para observar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layout.",
    color: "#ff0000",
  },
  {
    id: 25,
    titulo: "Nota 25",
    nota: "Contenido de la nota 25. Un ejemplo con contenido extenso para ver la adaptación en el diseño.observar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layoutobservar cómo se presenta en el layout",
    color: "#0000ff",
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

  const handlePress = (id) => {
    console.log("Nota presionada", id);
  };
  return (
    <I18nextProvider i18n={i18next}>
      <View style={tw`flex-1 p-4`}>
        <View
          style={tw`flex-row items-center justify-between mb-6`}
        >
          <View
            style={tw`flex-row items-center bg-white dark:bg-black p-1 rounded`}
          >
            <Text
              style={tw`text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 font-bold mr-3`}
            >
              {t("title_notitas")}
            </Text>
            <TouchableOpacity
              style={tw`p-1 rounded bg-white dark:bg-black`}
              onPress={() => {
                console.log("Agregar nota");
              }}
            >
              <AddIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`flex-1`}>
          <MasonryList
            data={notas} // Utiliza los datos obtenidos de la API
            numColumns={columns}
            renderItem={({ item: data }) => (
              <TouchableOpacity
                key={data.id}
                onPress={() => handlePress(data.id)}
                style={[
                  tw`w-full border-2 rounded p-2 overflow-hidden mb-2`,
                  {
                    borderColor: data.color || "zinc-900",
                  },
                ]}
              >
                <Text style={tw`text-xl`}>{data.titulo}</Text>
                <Text>{data.nota}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </I18nextProvider>
  );
}