enum SplashStatus {
  unknown,
  authenticated,
  unauthenticated;

  bool get isUnknown => this == SplashStatus.unknown;

  bool get isAuthenticated => this == SplashStatus.authenticated;

  bool get isUnauthenticated => this == SplashStatus.unauthenticated;
}
