import styles from './UserTable.module.css'
import { TUser } from "../types/User"
import { generateSampleUsers } from '../data/sampleUsers'
import { useEffect, useState } from 'react'
import { formatBalance, formatDate, formatTitleDate } from '../utils/format'
const UserTable = () => {
	const ROW_PER_PAGE = 10
	const [data, setData] = useState<TUser[]>([])

	useEffect(() => {
		setData(generateSampleUsers(50))
	}, [])
	console.log(data)
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
						<th className={styles.titleHeadTable}>ACTION</th>
					</tr>
				</thead>
				<tbody>
					{data.map((user) =>
						<tr key={user.id} className={styles.bodyTable}>
							<td className={styles.contentBodyTable}>
								<input type='checkbox' />
								{user.name}
							</td>
							<td className={styles.contentBodyTable}>
								{formatBalance(user.balance)}
							</td>
							<td className={styles.contentBodyTable}>
								<a href={`mailto:${user.email}`}></a>
								{user.email}
							</td>
							<td className={styles.contentBodyTable} title={formatTitleDate(user.registerAt)}>
								{formatDate(user.registerAt)}
							</td>
							<td className={styles.contentBodyTable}>
								<span className={styles.status}>Status</span>
							</td>
							<td className={styles.contentBodyTable}>{user.name}</td>
						</tr>
					).slice(0, ROW_PER_PAGE)}
				</tbody>
			</table>
		</div>)
}

export default UserTable