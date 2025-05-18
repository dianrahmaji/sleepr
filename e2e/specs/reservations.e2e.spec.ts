const user = {
  email: 'dianrahmaji@gmail.com',
  password: 'Pasdweq12@!',
};

describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '2022-02-01T00:00:00Z',
          endDate: '2022-02-05T00:00:00Z',
          placeId: '12345',
          invoiceId: '493',
          charge: {
            amount: 200,
            card: {
              cvc: '413',
              exp_month: 12,
              exp_year: 2030,
              number: '4242424242424242',
            },
          },
        }),
      },
    );

    expect(responseCreate.ok).toBeTruthy();

    const createdReservation = await responseCreate.json();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    const reservation = await responseGet.json();

    expect(createdReservation).toEqual(reservation);
  });
});
