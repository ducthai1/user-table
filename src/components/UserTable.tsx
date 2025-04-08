import styles from './UserTable.module.css'
import { TUser } from "../types/User"
import { generateSampleUsers } from '../data/sampleUsers'
import { useEffect, useRef, useState } from 'react'
import { formatBalance, formatDate, formatTitleDate } from '../utils/format'
const UserTable = () => {
	const ROWS_PER_PAGE = 11
	const COUNTED_USER = 50

	const [currentPage, setCurrentPage] = useState(1)
	const [data, setData] = useState<TUser[]>([])
	const [selected, setSelected] = useState<Set<string>>(new Set())
	const [editingId, setEditingId] = useState('')
	const [editingName, setEditingName] = useState('')
	const refName = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setData(generateSampleUsers(COUNTED_USER))
	}, [])

	useEffect(() => {
		if (editingId && refName.current) {
			refName.current.focus()
		}
	}, [editingId])

	const totalPages = Math.ceil(data.length / ROWS_PER_PAGE)

	const toggleSelected = () => {
		const isAllSelected = data.slice(currentPage - 1, currentPage + ROWS_PER_PAGE - 1).every(user => selected.has(user.id))

		if (isAllSelected) {
			setSelected(new Set())
		} else {
			const allIds = data.slice(currentPage - 1, currentPage + ROWS_PER_PAGE - 1).map(user => user.id)
			setSelected(new Set(allIds))
		}
	}

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
		if (window.confirm("Are you sure want to delete this row?")) {
			setData(prev =>
				prev.filter(user => user.id !== id)
			)
		}
	}

	return (
		<div className={styles.container}>
			<table className={styles.tableUser}>
				<thead>
					<tr className={styles.headTable}>
						<th className={styles.titleHeadTable}>
							<input
								type='checkbox'
								onChange={toggleSelected}
								checked={data.slice(0, currentPage + ROWS_PER_PAGE - 1).every(user => selected.has(user.id))}
							/>
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
								<input type='checkbox' checked={selected.has(user.id)}
									onChange={() => {
										setSelected(prev => {
											const newSet = new Set(prev)
											if (newSet.has(user.id)) {
												newSet.delete(user.id)
											} else {
												newSet.add(user.id)
											}
											return newSet
										})
									}} />
								<span className="checkmark"></span>
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
								<a className={styles.contentEmail} title={`mailto:${user.email}`} href={`mailto:${user.email}`}>
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
					).slice(currentPage - 1, currentPage + ROWS_PER_PAGE - 1)}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<span className={styles.paginationInfo}>{data.length} results</span>
				<div className={styles.paginationControls}>
					<button
						className={styles.pageBtn}
						onClick={() => setCurrentPage(page => page - 1)}
						disabled={currentPage === 1}
					>
						&lt;
					</button>
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index + 1}
							className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.activePage : ""}`}
							onClick={() => setCurrentPage(index + 1)}
						>
							{index + 1}
						</button>
					))}
					<button
						className={styles.pageBtn}
						onClick={() => setCurrentPage(page => page + 1)}
						disabled={currentPage === totalPages}
					>
						&gt;
					</button>
				</div>
			</div>
		</div>)
}

export default UserTable