import 'package:flutter/material.dart';

class ClaimScreen extends StatelessWidget {
  const ClaimScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Insurance Claim')),
      body: const Center(child: Text('보험 청구 (Omnione Chain)')),
    );
  }
}
