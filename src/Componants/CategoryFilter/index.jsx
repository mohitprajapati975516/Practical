import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryWiseFilter_Redux } from "../../Redux/slice";

const CategoryFilter = ({ productData }) => {
  const dispatch = useDispatch();
  const categoryRedux = useSelector((state) => state.categoryWiseFilter_redux);

  let categoryData = [];
  for (let i = 0; i < productData?.length; i++) {
    if (!categoryData.includes(productData[i]?.category)) {
      categoryData.push(productData[i]?.category);
    }
  }
  const handleFilterCategory = (category) => {
    if (categoryRedux.includes(category)) {
      dispatch(
        setCategoryWiseFilter_Redux(
          categoryRedux.filter((item) => item !== category)
        )
      );
    } else {
      dispatch(setCategoryWiseFilter_Redux([...categoryRedux, category]));
    }
  };

  return (
    <>
      <div className="filterCover">
        <h5>Filter By Category</h5>
        <ul>
          {categoryData?.map((item, ind) => {
            return (
              <>
                <li>
                  <div className="inline">
                    <label>
                      <input
                        type="checkbox"
                        checked={categoryRedux.includes(item)}
                        onChange={() => handleFilterCategory(item)}
                      />
                      <span>{item}</span>
                    </label>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CategoryFilter;
