import './add-cell.css';
import { useActions } from '../hooks/use-actions';


interface AddCellProps {
    previusCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previusCellId, forceVisible }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(previusCellId, 'code')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>Code</span>
                </button>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(previusCellId, 'text')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;