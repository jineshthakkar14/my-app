import * as React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setBuildingEnergy, setSolarEnergy } from '../../slices/solarSlice';

export interface DemoWorkspaceWidgetProps {
	buttons?: any;
}

namespace S {
	export const Toolbar = styled.div`
		padding: 5px;
		display: flex;
		flex-shrink: 0;
	`;

	export const Content = styled.div`
		flex-grow: 1;
		height: 100%;
	`;

	export const Container = styled.div`
		background: black;
		display: flex;
		flex-direction: column;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
	`;
}

export const DemoButton = styled.button`
	background: rgb(60, 60, 60);
	font-size: 14px;
	padding: 5px 10px;
	border: none;
	color: white;
	outline: none;
	cursor: pointer;
	margin: 2px;
	border-radius: 3px;

	&:hover {
		background: rgb(0, 192, 255);
	}
`;

export const DemoWorkspaceWidget : React.FC<React.PropsWithChildren<DemoWorkspaceWidgetProps>> = (props) => {
	
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm({
		defaultValues: {
			solarValue: 10,
			buildingValue: 10
		},
		shouldUnregister:true
	  })

	function submitHandler(data){
		dispatch(setSolarEnergy(data.solarValue))
		dispatch(setBuildingEnergy(data.buildingValue))
		
	}
	
	return (
		<S.Container>
			<S.Toolbar>{props.buttons}</S.Toolbar>
			
				<div className='bg-white flex justify-center items-center gap-[100px] p-5'>
					<form onSubmit={handleSubmit(submitHandler)}>
						<div className='flex flex-col gap-5'>
							<label id='solarValue'>Enter The Solar Energy (kWh)</label>
							<input type="number" className='border-2 border-black text-center' id="solarValue" name='solarValue' placeholder='Solar Energy (kWh)'
							{...register("solarValue")}
							></input>	
						</div>
						<div className='flex flex-col gap-5'>
							<label id='buildingValue'>Enter The Building Energy (kWh)</label>
							<input type="number" className='border-2 border-black text-center' id="buildingValue" placeholder='Solar Building (kWh)'
							{...register("buildingValue")}
							></input>	
						</div>
						<button className='button-24 mt-4 w-full'>
							Update
						</button>
					</form>
				</div>
			<S.Content>{props.children}</S.Content>
		</S.Container>
	);
}