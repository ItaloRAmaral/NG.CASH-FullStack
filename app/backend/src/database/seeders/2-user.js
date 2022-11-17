module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'italoamaral',
        password: '5a593af7b639053153d72b0ca3aed6b1',
          // senha: md5('ItaloTeste12')
        account_id: 1,
      },
      {
        username: 'fulaninhadetal',
        password: '3c28d2b0881bf46457a853e0b07531c6',
          // ('fulana@123')
        account_id: 2,
      },
    ], {
      ignoreDuplicates: true
    });
        // await queryInterface.sequelize.query("SELECT setval('id_id_seq', max(id)) FROM users;")
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
