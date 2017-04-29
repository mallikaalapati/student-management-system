const query = require('../../utilities/query')

const PunishmentRecordColumns = [
  'sid',
  'punishment_id',
  'timestamp'
]

const TABLE_NAME = 'punishment_records'

const getAllPunishment = () => `SELECT  student_id, firstname, lastname, punishment_records. punishment_id, punishment_name, score_deduction 
FROM punishment_records 
left join students 
on punishment_records.sid = students.sid 
left join punishment_criteria
on punishment_records.punishment_id = punishment_criteria.punishment_id`

const filterStudentSQL = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertPunishment = (dataSet) => {
  return `insert into punishment_records ( sid, punishment_id, timestamp) select
  (select sid from students where student_id = ${dataSet.student_id}) As sid,
  (select punishment_id from punishment_criteria where punishment_id = ${dataSet.punishment_id}) As punishment_id,
  (select NOW()) As timestamp`
}

const updatePunishment = (dataSet) => {
  return `update punishment_records 
  set sid = (select sid from students where student_id = ${dataSet.student_id}) As student_sid, 
  punishment_id = (select punishment_id from punishment_criteria where punishment_id = ${dataSet.punishment_id}) 
  where timestamp = ${dataSet.timestamp} and punishment_records.punishment_id = ${dataSet.old_punishment_id} and sid = (select sid from students where student_id = ${dataSet.student_id} ) `
}
const deletePunishment = (dataSet) => {
  return query.transformToSQL.delete(TABLE_NAME, dataSet)
}

module.exports = {
  PunishmentRecordColumns,
  getAllPunishment,
  filterStudentSQL,
  insertPunishment,
  deletePunishment,
  updatePunishment
}
