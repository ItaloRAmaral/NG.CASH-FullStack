module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        balance: 530,
      },
      {
        balance: 120,
      },
    ], {
      ignoreDuplicates: true
    });
    // await queryInterface.sequelize.query("SELECT setval('id_id_seq', max(id)) FROM accounts;")
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
