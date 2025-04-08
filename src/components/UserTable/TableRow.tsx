import styles from './UserTable.module.css'
import { formatBalance, formatDate, formatTitleDate } from '../../utils/format'
import { TUser } from '../../types/User'
import ActionButtons from './ActionButtons'

type Props = {
	user: TUser
	isSelected: boolean
	isEditing: boolean
	editingName: string
	refName: React.RefObject<HTMLInputElement | null>
	onToggle: () => void
	onChangeName: (value: string) => void
	onSave: () => void
	onCancel: () => void
	onEdit: () => void
	onDelete: () => void
}

const TableRow = ({
	user,
	isSelected,
	isEditing,
	editingName,
	refName,
	onToggle,
	onChangeName,
	onSave,
	onCancel,
	onEdit,
	onDelete
}: Props) => (
	<tr key={user.id} className={styles.bodyTable}>
		<td className={`${styles.contentBodyTable} ${styles.contentName}`}>
			<input type="checkbox" checked={isSelected} onChange={onToggle} />
			<span className="checkmark"></span>
			<div className={styles.nameWrapper}>
				{isEditing ? (
					<input ref={refName} type="text" value={editingName} className={styles.inputEdit}
						onChange={e => onChangeName(e.target.value)} />
				) : <span>{user.name}</span>}
			</div>
		</td>
		<td className={styles.contentBodyTable}>{formatBalance(user.balance)}</td>
		<td className={styles.contentBodyTable}>
			<a className={styles.contentEmail} href={`mailto:${user.email}`} title={`mailto:${user.email}`}>
				{user.email}
			</a>
		</td>
		<td className={styles.contentBodyTable} title={formatTitleDate(user.registerAt)}>
			{formatDate(user.registerAt)}
		</td>
		<td className={styles.contentBodyTable}><span className={styles.status}>Status</span></td>
		<td className={`${styles.contentBodyTable} ${styles.contentAction}`}>
			<ActionButtons
				isEditing={isEditing}
				onSave={onSave}
				onCancel={onCancel}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</td>
	</tr>
)

export default TableRow
