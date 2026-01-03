part of 'splash.bloc.dart';

sealed class SplashEvent {
  const SplashEvent();
}

class SplashStarted extends SplashEvent {
  const SplashStarted();
}

class SplashStatusChanged extends SplashEvent {
  final SplashStatus status;
  const SplashStatusChanged(this.status);
}
