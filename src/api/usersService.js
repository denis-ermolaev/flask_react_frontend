import axios from "axios";

const URL = "http://localhost:5000";

/**
 * @typedef {object} User
 * @property {number} id - Уникальный идентификатор пользователя
 * @property {string} name - Имя пользователя
 * @property {string} email - Email пользователя
 */

/**
 * @typedef {object} MetaPagination
 * @property {number} page - Текущая страница
 * @property {number} per_page - Элементов на страницу
 * @property {number} total_items - Всего элементов в БД
 * @property {number} total_pages - Всего страниц
 */

/**
 * @typedef {object} Users
 * @property {User[]} data - Массив пользователей на странице
 * @property {MetaPagination} meta - Информация о пагинации
 */

/**
 * Получает список пользователей с пагинацией.
 * @param {number} page - Номер страницы
 * @param {number} per_page - Количество элементов на странице
 * @returns {Promise<Users>} - Объект с пользователями и информацией о пагинации
 */
export async function fetchUsers(page, per_page) {
  try {
    const response = await axios.get(`${URL}/users`, {
      params: {
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Получает одного пользователя по ID.
 * @param {number | string} id - ID пользователя
 * @returns {Promise<User>} - Объект пользователя
 */
export async function fetchUser(id) {
  try {
    const response = await axios.get(`${URL}/user/${parseInt(id)}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Добавляет нового пользователя.
 * @param {string} name - Имя пользователя
 * @param {string} email - Email пользователя
 * @returns {Promise<number>} - Возвращает id созданного пользователя
 */
export async function addUser(name, email) {
  try {
    const response = await axios.post(`${URL}/user`, {
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
