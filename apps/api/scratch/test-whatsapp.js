const fs = require('fs');
const path = require('path');

// Charger le fichier .env
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0 && !key.startsWith('#')) {
    env[key.trim()] = values.join('=').trim().replace(/^"|"$/g, '');
  }
});

const token = env.WHATSAPP_TOKEN;
const phoneId = env.WHATSAPP_PHONE_ID;
// Numéro de test du créateur (ajustez si besoin)
const toPhone = '221705191908'; 

async function testWhatsApp() {
  console.log('--- TEST WHATSAPP API ---');
  console.log('Phone ID:', phoneId);
  console.log('Token (début):', token.substring(0, 15) + '...');
  console.log('Destinataire:', toPhone);
  console.log('Envoi en cours...\n');

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: toPhone,
        type: 'text',
        text: { body: `*Test Webhook Mbolo Pay*\n\nSi vous lisez ce message, c'est que l'API WhatsApp fonctionne parfaitement ! 🎉` }
      })
    });

    const result = await response.json();
    console.log('Réponse de Meta :');
    console.dir(result, { depth: null, colors: true });

    if (result.error) {
      console.log('\n❌ ERREUR DÉTECTÉE :');
      if (result.error.code === 131047) {
        console.log('=> Règle des 24h : L\'utilisateur n\'a pas envoyé de message à l\'entreprise dans les dernières 24h.');
        console.log('=> SOLUTION : Envoyez "Bonjour" sur WhatsApp au numéro d\'entreprise, puis relancez ce script.');
      } else if (result.error.code === 131030) {
        console.log('=> Numéro non autorisé : Le numéro destinataire n\'est pas enregistré dans les testeurs sur le dashboard Meta.');
      } else {
        console.log('=>', result.error.message);
      }
    } else {
      console.log('\n✅ SUCCÈS ! Le message a été envoyé.');
    }

  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
}

testWhatsApp();
