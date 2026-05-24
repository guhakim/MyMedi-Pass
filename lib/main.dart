import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() => runApp(const MyMediApp());

class MyMediApp extends StatelessWidget {
  const MyMediApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyMedi Pass',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomeScreen(),
    );
  }
}
