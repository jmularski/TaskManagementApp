import request from '../helpers/api-handler';

function addCard({
  token, number, expiration, cvc,
}) {
  return request({
    url: '/api/private/payments/card/add/',
    authHeader: token,
    type: 'POST',
    data: {
      number,
      expiration_month: expiration.month,
      expiration_year: expiration.year,
      cvc,
    },
  });
}

function recryptCard({ token, encryptedCard }) {
  return request({
    url: '/api/private/payments/card/update',
    authHeader: token,
    type: 'POST',
    data: {
      encrypted_card: encryptedCard,
    },
  });
}

const CardService = {
  addCard, recryptCard,
};

export default CardService;
