import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import i18next from "../config/lang/services/i18next";
import Modals from "../components/Modal";
import tw from "twrnc";
import { AddIcon, FilterIcon } from "../components/Icons";
import { useAuth } from '../context/AuthContext/useAuth';
import { useFetch } from '../hooks/useFetch';

const getColumnsCount = (width) => {
  if (width < 350) return 1;
  if (width < 750) return 2;
  if (width < 900) return 3;
  return 4;
};

export default function Home() {
  const auth = useAuth();
  const { t } = useTranslation();
  const [columns, setColumns] = useState(
    getColumnsCount(Dimensions.get("window").width)
  );

  const { data: notitas, loading: loadingNotitas, error: errorNotitas } = useFetch({
    url: '/notitas_back/api/v1/notitas/usuarios',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.usuario.token}`,
    }
  });
  if (errorNotitas) {
    console.log('Error al obtener las notas', errorNotitas);
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnsCount(Dimensions.get("window").width));
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handlePress = (note) => {
    setSelectedNote(note);
    setNoteTitle(note.titulo);
    setNoteContent(note.nota);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log(`Title: ${noteTitle}`);
    console.log(`Content: ${noteContent}`);
    setModalVisible(false);
  };

  return (
    <I18nextProvider i18n={i18next}>
      <View style={tw`flex-1 p-4`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View
            style={tw`flex-row items-center bg-white dark:bg-black p-1 rounded`}
          >
            <Text
              style={tw`text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 font-bold mr-3`}
            >
              {t("title_notitas")}
            </Text>
            <TouchableOpacity
              style={tw`rounded bg-zinc-100 dark:bg-black p-2`}
              onPress={() => {
                setNoteTitle("");
                setNoteContent("");
                setModalVisible(true);
              }}
            >
              <AddIcon style={tw`text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={tw`items-end rounded bg-zinc-100 dark:bg-black`}
            onPress={() => {
              console.log("filtro nota");
            }}
          >
            <FilterIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-1`}>
          {loadingNotitas ? (
            <Text>Cargando...</Text>
          ) : errorNotitas ? (
            <Text>Error: {errorNotitas}</Text>
          ) : notitas && notitas.length > 0 ? (
            <MasonryList
              data={notitas}
              numColumns={columns}
              renderItem={({ item: data }) => (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => handlePress(data)}
                  style={[
                    tw`max-h-96 border-2 rounded p-2 overflow-hidden mb-2`,
                    {
                      borderColor: data.color || "zinc-900",
                      margin: 5,
                    },
                  ]}
                >
                  <Text style={tw`text-xl`}>{data.titulo}</Text>
                  <Text>{data.nota}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No hay notas para mostrar</Text>
          )}
        </View>

        {modalVisible && (
          <Modals
            visible={modalVisible}
            onClose={handleCloseModal}
            title={noteTitle}
            content={noteContent}
            setTitle={setNoteTitle}
            setContent={setNoteContent}
          />
        )}
      </View>
    </I18nextProvider>
  );
}
