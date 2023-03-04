import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Container from '../container/Container';
import {
	Link,
	NavLink,
	useLocation,
	useNavigate,
	useSearchParams
} from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import SearchResult from '../../search-result/SearchResult';
import { mergeClassName } from '../../../../utils/merge-class-name';

interface INavLinks {
	id: string;
	title: string;
	link: string;
}

const NAV_LINKS: INavLinks[] = [
	{
		id: 'nav-movies',
		title: 'Movies',
		link: '/your-movie/movies'
	},
	{
		id: 'nav-tv',
		title: 'TV',
		link: '/your-movie/tv'
	}
];

const Header: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [params] = useSearchParams();

	const pathnameRef = useRef('');
	const [keyword, setKeyword] = useState('');
	const [isSearchFocus, setIsSearchFocus] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	const goToSearchPage = useCallback(() => {
		if (keyword) {
			navigate(`/your-movie/search?q=${keyword}`);
			setIsSearchFocus(false);
			searchRef.current?.blur();
		}
	}, [keyword, navigate]);

	const initKeyword = useCallback(() => {
		if (pathnameRef.current === '/your-movie/search') {
			setKeyword(params.get('q') || '');
		} else {
			setKeyword('');
		}
	}, [params]);

	const onWindowClick = useCallback(() => {
		setIsSearchFocus(false);
		initKeyword();
	}, [initKeyword]);

	useEffect(() => {
		pathnameRef.current = location.pathname;
		initKeyword();
	}, [location.pathname, initKeyword]);

	useEffect(() => {
		window.addEventListener('click', onWindowClick);

		return () => {
			window.removeEventListener('click', onWindowClick);
		};
	}, [onWindowClick]);

	return (
		<header className='bg-header'>
			<Container className='flex items-center justify-between'>
				<div className='flex items-stretch gap-6'>
					{/*brand*/}
					<h1 className='text-2xl font-semibold'>
						<Link to={'/your-movie'}>YMovie</Link>
					</h1>
					{/*menu*/}
					<div className='flex items-center gap-1.5 mobile:fixed mobile:bottom-0 mobile:right-0 mobile:left-0 mobile:justify-center mobile:py-3 mobile:bg-header mobile:gap-6'>
						{NAV_LINKS.map(({ title, id, link }) => (
							<NavLink
								key={id}
								className={({ isActive }) => {
									const menuClasses =
										'px-1.5 py-1 hover:bg-primary transition rounded-md mobile:px-6';
									return isActive
										? mergeClassName(menuClasses, 'bg-primary')
										: menuClasses;
								}}
								to={link}
							>
								{title}
							</NavLink>
						))}
					</div>
				</div>
				<div className='relative flex-[0.4] border-b-[1.5px] border-white flex items-center p-1 focus-within:border-primary transition mobile:flex-[0.5] ultra-xl:w-max ultra-xl:flex-[0.4]'>
					<input
						onClick={e => {
							e.stopPropagation();
							setIsSearchFocus(true);
						}}
						onKeyDown={e => (e.key === 'Enter' ? goToSearchPage() : '')}
						onInput={e => setKeyword(e.currentTarget.value)}
						type='text'
						value={keyword}
						className='bg-transparent outline-none flex-1 ultra-xl:max-w-[10rem]'
						placeholder='search ...'
					/>
					<IoIosSearch size={18} />
					{/*tmp results*/}
					{isSearchFocus ? (
						<SearchResult keyword={keyword} goToSearchPage={goToSearchPage} />
					) : (
						''
					)}
				</div>
			</Container>
		</header>
	);
};

export default Header;
