import styles from './UserTable.module.css'

type Props = {
	onToggleAll: () => void
	allChecked: boolean
	onDelete: boolean
	onDeleteAll?: () => void
}

const TableHeader = ({ onToggleAll, allChecked, onDelete, onDeleteAll }: Props) => (
	<thead>
		<tr className={styles.checkAllTableMobile}>
			<input type="checkbox" onChange={onToggleAll} checked={allChecked} /> Check All Users
			{onDelete ?
				<button className={styles.btnAction} title="Delete" onClick={onDeleteAll} >
					<i className="fa-solid fa-trash"></i>
				</button>
				:
				<></>
			}
		</tr>
		<tr className={styles.headTable}>
			<th className={styles.titleHeadTable}>
				<input type="checkbox" onChange={onToggleAll} checked={allChecked} /> Name
			</th>
			<th className={styles.titleHeadTable}>Balance ($)</th>
			<th className={styles.titleHeadTable}>Email</th>
			<th className={styles.titleHeadTable}>Registration</th>
			<th className={styles.titleHeadTable}>STATUS</th>
			<th className={`${styles.titleHeadTable} ${styles.titleAction}`}>ACTION</th>
		</tr>
	</thead>
)

export default TableHeader
