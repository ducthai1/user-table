import styles from './UserTable.module.css'

type Props = {
	isEditing: boolean
	onSave: () => void
	onCancel: () => void
	onEdit: () => void
	onDelete: () => void
}

const ActionButtons = ({ isEditing, onSave, onCancel, onEdit, onDelete }: Props) => (
	<div className={styles.actionWrapper}>
		{isEditing ? (
			<>
				<button className={styles.btnAction} title="Save" onClick={onSave}>
					<i className="fa-solid fa-floppy-disk"></i>
				</button>
				<button className={styles.btnAction} title="Cancel" onClick={onCancel}>
					<i className="fa-solid fa-x"></i>
				</button>
			</>
		) : (
			<>
				<span className={styles.placeholder}></span>
				<span className={styles.placeholder}></span>
				<button className={styles.btnAction} title="Edit" onClick={onEdit}>
					<i className="fa-solid fa-pen"></i>
				</button>
			</>
		)}
		<button className={styles.btnAction} title="Delete" onClick={onDelete}>
			<i className="fa-solid fa-trash"></i>
		</button>
	</div>
)

export default ActionButtons
