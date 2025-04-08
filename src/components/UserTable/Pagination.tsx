import styles from './UserTable.module.css'
import { getVisiblePages } from '../../utils/visiblepage'

type Props = {
	total: number
	rowsPerPage: number
	setRowsPerPage: (value: number) => void
	currentPage: number
	totalPages: number
	setCurrentPage: (value: number) => void
	onDelete: boolean
	onDeleteAll?: () => void
}

const Pagination = ({ total, rowsPerPage, setRowsPerPage, currentPage, totalPages, setCurrentPage, onDelete, onDeleteAll }: Props) => (
	<div className={styles.pagination}>
		<span className={styles.paginationInfo}>
			{total} results
			{onDelete ?
				<button className={`${styles.btnAction} ${styles.hiddenOnMobile}`} title="Delete" onClick={onDeleteAll} >
					<i className="fa-solid fa-trash"></i>
				</button>
				:
				<></>
			}
		</span>
		<div>
			Rows per page:{" "}
			<select value={rowsPerPage} onChange={e => {
				setRowsPerPage(Number(e.target.value))
				setCurrentPage(1)
			}}>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
			</select>
		</div>
		<div className={styles.paginationControls}>
			<button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
			{getVisiblePages(currentPage, totalPages).map((page, index) =>
				page === "..." ? (
					<span key={`ellipsis-${index}`} className={styles.pageEllipsis}>...</span>
				) : (
					<button key={page} className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ""}`}
						onClick={() => setCurrentPage(Number(page))}>{page}</button>
				)
			)}
			<button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
		</div>
	</div>
)

export default Pagination
