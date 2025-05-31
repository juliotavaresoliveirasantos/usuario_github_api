import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

class UsuarioGitHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: {},
      usuario: "dioneferrari",
    };
    this.carregaDados = this.carregaDados.bind(this);
  }

  carregaDados() {
    fetch(`https://api.github.com/users/${this.state.usuario}`)
      .then((response) => response.json())
      .then((json) => this.setState({ dados: json }))
      .catch((err) => this.setState({ dados: { err } }));
  }

  componentDidMount() {
    this.carregaDados();
  }

  render() {
    const { dados, usuario } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Consulta GitHub</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o usuário do GitHub"
          onChangeText={(usuario) => this.setState({ usuario })}
          value={usuario}
        />

        <TouchableOpacity style={styles.button} onPress={this.carregaDados}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>

        {dados && dados.login && (
          <View style={styles.card}>
            <Image style={styles.avatar} source={{ uri: dados.avatar_url }} />
            <Text style={styles.name}>{dados.name || dados.login}</Text>
            <Text style={styles.info}>@{dados.login}</Text>
            <Text style={styles.bio}>{dados.bio}</Text>
            <Text style={styles.info}>
              📍 {dados.location || "Localização não informada"}
            </Text>
            <Text style={styles.stats}>
              👥 Seguidores: {dados.followers} | Seguindo: {dados.following}
            </Text>
            <Text style={styles.repo}>📦 Repositórios públicos: {dados.public_repos}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: 80,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  bio: {
    fontStyle: "italic",
    marginVertical: 10,
    textAlign: "center",
    color: "#666",
  },
  stats: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  repo: {
    marginTop: 5,
    fontSize: 16,
    color: "#444",
  },
});

export default UsuarioGitHub;
