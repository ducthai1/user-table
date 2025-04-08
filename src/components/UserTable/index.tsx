import styles from './UserTable.module.css'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import Pagination from './Pagination'
import { useEffect, useRef, useState } from "react";
import { TUser } from "../../types/User";
import { generateSampleUsers } from "../../data/sampleUsers";

const COUNTED_USER = 106;
const ROWS_PER_PAGE = 10

const UserTable = () => {
	const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<TUser[]>([]);
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [editingId, setEditingId] = useState("");
	const [editingName, setEditingName] = useState("");
	const refName = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setData(generateSampleUsers(COUNTED_USER));
	}, []);

	useEffect(() => {
		if (editingId && refName.current) refName.current.focus();
	}, [editingId]);

	const totalPages = Math.ceil(data.length / rowsPerPage);
	const currentPageUsers = data.slice(
		rowsPerPage * (currentPage - 1),
		rowsPerPage * currentPage
	);

	const toggleSelected = () => {
		const isAllSelected = currentPageUsers.every(
			user => selected.has(user.id)
		)
		setSelected(prev => {
			const newSet = new Set(prev)
			if (isAllSelected) {
				currentPageUsers.forEach(user => newSet.delete(user.id))
			} else {
				currentPageUsers.forEach(user => newSet.add(user.id))
			}
			return newSet
		});
	};

	const toggleUserSelection = (id: string) => {
		setSelected(prev => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				newSet.add(id)
			}
			return newSet
		})
	};

	const handleEdit = (id: string, name: string) => {
		setEditingId(id);
		setEditingName(name);
	};

	const handleSave = (id: string) => {
		setData((prev) =>
			prev.map((user) =>
				user.id === id ? { ...user, name: editingName } : user
			)
		);
		setEditingId("");
	};

	const handleDelete = (id: string) => {
		if (window.confirm("Are you sure want to delete this row?")) {
			setData((prev) => prev.filter((user) => user.id !== id));
		}
	};

	const handleDeleteSelected = () => {
		if (window.confirm("Are you sure you want to delete selected rows?")) {
			setData(prev => prev.filter(user => !selected.has(user.id)));
			setSelected(new Set());
		}
	}

	return (
		<div className={styles.container}>
			<table className={styles.tableUser}>
				<TableHeader
					onToggleAll={toggleSelected}
					allChecked={currentPageUsers.every(user => selected.has(user.id))}
					onDelete={selected.size > 1}
					onDeleteAll={handleDeleteSelected}
				/>
				<tbody>
					{currentPageUsers.map(user => (
						<TableRow
							key={user.id}
							user={user}
							isSelected={selected.has(user.id)}
							isEditing={editingId === user.id}
							editingName={editingName}
							refName={refName}
							onToggle={() => toggleUserSelection(user.id)}
							onChangeName={setEditingName}
							onSave={() => handleSave(user.id)}
							onCancel={() => setEditingId("")}
							onEdit={() => handleEdit(user.id, user.name)}
							onDelete={() => handleDelete(user.id)}
						/>
					))}
				</tbody>
			</table>
			<Pagination
				total={data.length}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				onDelete={selected.size > 1}
				onDeleteAll={handleDeleteSelected}
			/>
		</div>
	)
}

export default UserTable
