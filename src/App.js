import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

    setRepositories(
      repositories.map((repo) =>
        repo.id === id ? { ...repo, likes: response.data.likes } : repo
      )
    );
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <FlatList
            data={repositories}
            showsVerticalScrollIndicator={false}
            keyExtractor={(repository) => repository.id}
            renderItem={({ item: repository }) => (
              <>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  {repository.techs.map((repo) => (
                    <Text key={repo} style={styles.tech}>
                      {repo}
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes === 0 && "Nenhuma curtida"}
                    {repository.likes === 1 && "1 curtida"}
                    {repository.likes > 1 && `${repository.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
