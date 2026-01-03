import 'package:template/data/datasources/local/local_datasource.dart';

class HiveDataSource implements LocalDataSource {
  @override
  Future<String> getToken() {
    // TODO: implement getToken
    throw UnimplementedError();
  }

  @override
  Future<void> saveToken(String token) {
    // TODO: implement saveToken
    throw UnimplementedError();
  }
}

class User {
  final String name;
  final String password;

  const User({
    required this.name,
    required this.password,
  });
}

void a() {
  List<User> user = [User(name: '', password: '')];
}
