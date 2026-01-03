import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:template/pages/forgot_password/bloc/forgot_password.bloc.dart';

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});
  @override
  Widget build(BuildContext context) => BlocProvider<ForgotPasswordBloc>(
        create: (_) => ForgotPasswordBloc(),
        child: BlocListener<ForgotPasswordBloc, ForgotPasswordState>(
          listenWhen: (previous, current) => previous.status != current.status,
          listener: _listener,
          child: Builder(
            builder: (BuildContext context) => Scaffold(
              resizeToAvoidBottomInset: false,
              appBar: AppBar(
                title: const Text('Forgot Password'),
              ),
            ),
          ),
        ),
      );
}

void _listener(BuildContext context, ForgotPasswordState state) {}
