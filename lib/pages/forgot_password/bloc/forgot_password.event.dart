part of 'forgot_password.bloc.dart';

sealed class ForgotPasswordEvent {
  const ForgotPasswordEvent();
}

class ForgotPasswordStatusChanged extends ForgotPasswordEvent {
  final ForgotPasswordStatus status;
  const ForgotPasswordStatusChanged(this.status);
}
