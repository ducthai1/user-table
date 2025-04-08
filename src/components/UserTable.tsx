import styles from './UserTable.module.css'
import { TUser } from "../types/User"
import { generateSampleUsers } from '../data/sampleUsers'
import { useEffect, useRef, useState } from 'react'
import { formatBalance, formatDate, formatTitleDate } from '../utils/format'
const UserTable = () => {
	const ROW_PER_PAGE = 10
	const [data, setData] = useState<TUser[]>([])
	const [editingId, setEditingId] = useState('')
	const [editingName, setEditingName] = useState('')
	const refName = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setData(generateSampleUsers(50))
	}, [])

	useEffect(() => {
		if (editingId && refName.current) {
			refName.current.focus()
		}
	}, [editingId])

	const handleEdit = (id: string, name: string) => {
		setEditingId(id)
		setEditingName(name)
	}

	const handleSave = (id: string) => {
		setData((prev) =>
			prev.map(user =>
				user.id === id ? { ...user, name: editingName } : user
			)
		)
		setEditingId('')
	}

	const handleDelete = (id: string) => {
		setData(prev =>
			prev.filter(user => user.id !== id)
		)
	}

	return (
		<div className={styles.container}>
			<table className={styles.tableUser}>
				<thead>
					<tr className={styles.headTable}>
						<th className={styles.titleHeadTable}>
							<input type='checkbox' />
							Name
						</th>
						<th className={styles.titleHeadTable}>Balance ($)</th>
						<th className={styles.titleHeadTable}>Email</th>
						<th className={styles.titleHeadTable}>Registration</th>
						<th className={styles.titleHeadTable}>STATUS</th>
						<th className={`${styles.titleHeadTable} ${styles.titleAction}`}>ACTION</th>
					</tr>
				</thead>
				<tbody>
					{data.map((user) =>
						<tr key={user.id} className={styles.bodyTable}>
							<td className={`${styles.contentBodyTable} ${styles.contentName}`}>
								<input type='checkbox' />
								<div className={styles.nameWrapper}>
									{editingId === user.id ?
										<input ref={refName} type='text' value={editingName} className={styles.inputEdit}
											onChange={(e) => setEditingName(e.target.value)} />
										:
										<span>
											{user.name}
										</span>
									}
								</div>
							</td>
							<td className={styles.contentBodyTable}>
								{formatBalance(user.balance)}
							</td>
							<td className={styles.contentBodyTable}>
								<a href={`mailto:${user.email}`}>
									{user.email}
								</a>
							</td>
							<td className={styles.contentBodyTable} title={formatTitleDate(user.registerAt)}>
								{formatDate(user.registerAt)}
							</td>
							<td className={styles.contentBodyTable}>
								<span className={styles.status}>Status</span>
							</td>
							<td className={`${styles.contentBodyTable} ${styles.contentAction}`}>
								<div className={styles.actionWrapper}>
									{editingId === user.id ? (
										<>
											<button className={styles.btnAction} title="Save" onClick={() => handleSave(user.id)}>
												<i className="fa-solid fa-floppy-disk"></i>
											</button>
											<button className={styles.btnAction} title="Cancel" onClick={() => setEditingId("")}>
												<i className="fa-solid fa-x"></i>
											</button>
										</>
									) : (
										<>
											<span className={styles.placeholder}></span>
											<span className={styles.placeholder}></span>
											<button className={styles.btnAction} title="Edit" onClick={() => handleEdit(user.id, user.name)}>
												<i className="fa-solid fa-pen"></i>
											</button>
										</>
									)}
									<button className={styles.btnAction} title="Delete" onClick={() => handleDelete(user.id)} >
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</td>
						</tr>
					).slice(0, ROW_PER_PAGE)}
				</tbody>
			</table>
		</div>)
}

export default UserTable