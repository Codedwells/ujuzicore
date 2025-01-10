'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type UserType = {
	id: number
	name: string
	email: string
	role: string
}

export default function Home() {
	const [users, setUsers] = useState<UserType[]>([])
	const [userType, setUserType] = useState<string>('all')

	const fetchUsers = (type: string) => {
		axios
			.get(`http://localhost:8001/api/v1/user?type=${type}`)
			.then((response) => {
				if (response.data.status === 'success') {
					const { data } = response.data
					setUsers(data.users)
				}
			})
			.catch((error) => {
				console.error('Error fetching users:', error)
			})
	}

	useEffect(() => {
		fetchUsers(userType)
	}, [userType])

	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<RadioGroup
				value={userType}
				onValueChange={(value) => setUserType(value)}
				className='mt-8 flex items-center gap-4 text-black'
			>
				<div className='flex items-center gap-1.5'>
					<RadioGroupItem value='all' />
					<Label htmlFor='option-one'>All</Label>
				</div>

				<div className='flex items-center gap-1.5'>
					<RadioGroupItem value='user' />
					<Label htmlFor='option-one'>User</Label>
				</div>

				<div className='flex items-center gap-1.5'>
					<RadioGroupItem value='admin' />
					<Label htmlFor='option-one'>Admin</Label>
				</div>
			</RadioGroup>
		</main>
	)
}
