import prisma from "../lib/prisma.js";
import createError from "../utils/createError.js";

export const createTodo = async (req, res, next) => {
  try {
    const { name } = req.body;

    const todo = await prisma.todo.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    res.status(201).json({ todo, message: "Todo Added" });
  } catch (error) {
    next(createError(500, "Unable to create todo"));
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(todos);
  } catch (error) {
    next(createError(500, "Unable to fetch todos"));
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const todo = await prisma.todo.update({
      where: { id },
      data: { name },
    });
    res.status(200).json({ todo, message: "Todo Updated" });
  } catch (error) {
    next(createError(500, "Unable to update todo"));
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id },
    });
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    next(createError(500, "Unable to delete todo"));
  }
};
