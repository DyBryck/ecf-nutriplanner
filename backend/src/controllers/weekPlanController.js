import * as weekPlanService from "../services/weekPlanService.js";

export const createWeekPlan = async (req) => {
  const body = {
    user_id: parseInt(req.body.user_id),
    name: req.body.name,
  };

  const weekPlan = await weekPlanService.createWeekPlan(body);

  return { message: "Plan de la semaine créé", weekPlan };
};

export const generateWeeklyPlan = async (req) => {
  const id = parseInt(req.query.user_id);

  const weekPlan = await weekPlanService.generateWeeklyPlan(id);

  return { message: "Plan de la semaine généré", weekPlan };
};

export const getWeekPlanById = async (req) => {
  const id = parseInt(req.params.id);

  const weekPlan = await weekPlanService.getWeekPlanById(id);

  return { message: "Plan de la semaine récupéré", weekPlan };
};
