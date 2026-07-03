import { Controller, Post, Body, HttpCode } from '@nestjs/common';

@Controller('ai')
export class AiController {
  
  @Post('generate-text')
  @HttpCode(200)
  async generateText(@Body() body: { title: string; category: string; targetXof: number }) {
    const { title, category, targetXof } = body;
    
    // Construct a strong, emotive prompt for the crowdfunding campaign
    const prompt = `Rédige une description très touchante et professionnelle en français pour une campagne de collecte de fonds (crowdfunding) au Sénégal. 
Titre de la cagnotte : "${title}"
Catégorie : ${category}
Objectif financier : ${targetXof} Francs CFA.

La description doit comporter 3 paragraphes courts : 
1. Une introduction poignante expliquant le contexte et l'urgence.
2. À quoi servira exactement l'argent récolté.
3. Un appel à l'action chaleureux remerciant les futurs donateurs.

Ne retourne que la description générée, sans texte autour.`;

    try {
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
      if (response.ok) {
        const text = await response.text();
        return { text: text.trim() };
      }
      return { text: "Erreur lors de la génération. Veuillez réessayer." };
    } catch (error) {
      console.error("Erreur IA Pollinations:", error);
      return { text: "Erreur lors de la génération. Veuillez réessayer." };
    }
  }
}
