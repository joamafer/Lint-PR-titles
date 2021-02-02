const validatePrTitle = require('./validatePrTitle');

it('throws for PR titles without the branch name', async () => {
  await expect(validatePrTitle('Fix this')).rejects.toThrow(
    'Missing branch name.'
  );
});

it('throws for PR titles with the wrong branch name', async () => {
  await expect(validatePrTitle('[CS-XXXX] Blabla')).rejects.toThrow(
    'Wrong branch name provided. It must be numbers.'
  );
});

it('throws for PR empty titles', async () => {
  await expect(validatePrTitle('')).rejects.toThrow(
    'No PR name provided.'
  );
});

it('throws for PR titles with the branch name and no description', async () => {
  await expect(validatePrTitle('[CS-12345]')).rejects.toThrow(
    'Missing description.'
  );
});

describe('branch formats', () => {
  it('allows lowercased branch format', async () => {
    await validatePrTitle('[cs-12345] Bla');
  });

  it('allows uppercased branch format', async () => {
    await validatePrTitle('[CS-12345] Bla');
  });
});
