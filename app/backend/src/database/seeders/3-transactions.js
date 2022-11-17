module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [{
        debited_account_id: 1,
        credited_account_id: 2,
        value: 10,
        created_at: new Date(),
      },
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 20,
        created_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
