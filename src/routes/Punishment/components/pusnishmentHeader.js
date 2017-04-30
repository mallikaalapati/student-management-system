import React from 'react'

import { requestAndResponse, removeNull } from '../../../utils/query'

const punishmentHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data, oldData) => {
      requestAndResponse(
        '../api/punishment/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_id: data.student_id,
            data: removeNull(data),
            oldData: oldData
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Delete',
    prop: 'delete',
    isDelete: true,
    formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
    onDelete: (resolve, reject, data) => {
      requestAndResponse(
        '../api/student/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            where: {
              student_id: data.student_id
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: true
  },
  {
    title: 'ชื่อจริง',
    prop: 'firstname',
    isEditable: false,
    isNullable: true
  },
  {
    title: 'นามสกุล',
    prop: 'lastname',
    isEditable: false,
    isNullable: true
  },
  {
    title: 'การลงโทษ',
    prop: 'punishment_name',
    isEditable: false,
    isNullable: true
  },
  {
    title: 'รหัสการลงโทษ',
    prop: 'punishment_id',
    isNullable: false
  },
  {
    title: 'วัน-เวลา',
    prop: 'timestamp',
    isEditable: false,
    isNullable: false
  },
  {
    title: 'คะแนนที่ถูกหัก',
    prop: 'score_deduction',
    isEditable: false,
    isNullable: false
  }
]

export default {
  table: {
    add: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/punishment/insert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(newData)
          })
        },
        resolve,
        reject
      )
    }
  },
  header: punishmentHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/punishment/all',
    parser: (raw) => raw.data
  }
}

