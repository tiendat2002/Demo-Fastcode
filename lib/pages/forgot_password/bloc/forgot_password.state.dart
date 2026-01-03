part of 'forgot_password.bloc.dart';

class ForgotPasswordState extends Equatable {
  final ForgotPasswordStatus status;
  const ForgotPasswordState.init() : status = ForgotPasswordStatus.init;
  @override
  List<Object?> get props => [status];
}
