import 'package:flutter/material.dart';

class RankingScreen extends StatelessWidget {
  const RankingScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Live Ranking')),
      body: const Center(child: Text('실시간 병원 인기세 (Ranking)')),
    );
  }
}
