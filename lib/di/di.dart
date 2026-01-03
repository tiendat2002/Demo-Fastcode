import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:template/di/di.config.dart';

final GetIt injector = GetIt.instance;

@InjectableInit(
  initializerName: 'init',
  asExtension: true,
)
void configDependencies() => injector.init();
