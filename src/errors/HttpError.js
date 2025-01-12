// Exporta a classe HttpError, que herda da classe nativa Error do JavaScript
module.exports = class HttpError extends Error {
  /**
   * Construtor da classe HttpError
   * @param {number} status - Código de status HTTP associado ao erro (ex: 404, 401, 500).
   * @param {string} message - Mensagem descritiva do erro.
   */
  constructor(status, message) {
    // Chama o construtor da classe Error com a mensagem do erro
    super(message);

    // Define o código de status HTTP como uma propriedade da instância
    this.status = status;
  }
};
