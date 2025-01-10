import { Logger } from 'borgen'
import { HttpStatusCode } from 'axios'
import type { IServerResponse } from '../types'
import type { Request, Response } from 'express'

let sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
  },
  {
    id: 3,
    name: 'James Brown',
    email: 'james.brown@example.com',
    role: 'User',
  },
]

// Get all users
// @route GET /api/v1/user/?type=all | user | admin
export const getUsers = async (
  req: Request,
  res: Response<IServerResponse>,
) => {
  try {
    const { type } = req.query

    if (!type || (type !== 'all' && type !== 'user' && type !== 'admin')) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid query parameter',
        data: null,
      })
    }

    let users = sampleUsers

    if (type === 'admin') {
      users = sampleUsers.filter((user) => user.role === 'Admin')
    } else if (type === 'user') {
      users = sampleUsers.filter((user) => user.role === 'User')
    }

    res.status(HttpStatusCode.Created).json({
      status: 'success',
      message: 'Users fetched successfully',
      data: {
        users: users,
      },
    })
  } catch (err) {
    Logger.error({ message: 'Error creating user' + err })

    res.status(HttpStatusCode.InternalServerError).json({
      status: 'error',
      message: 'Error getting all user',
      data: null,
    })
  }
}
