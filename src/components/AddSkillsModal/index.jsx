/**
 * AddSkillsModal
 *
 * Modal to select and add skills
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

import PageDivider from "components/PageDivider";
import PageH3 from "components/PageElements/PageH3";
import PageH2 from "components/PageElements/PageH2";
import PageFoot from "components/PageElements/PageFoot";
import Button from "components/Button";
import Modal from "components/Modal";
import Select from "components/ReactSelect";

import { BUTTON_SIZE, BUTTON_TYPE } from "constants";
import { skills as allSkills } from "constants";

import IconPlus from "../../assets/images/icon-plus.svg";
import IconCross from "../../assets/images/icon-cross.svg";

const AddSkillsModal = ({
  show = false,
  handleClose = (f) => f,
  onSkillsSaved = (f) => f,
  initialSelectedSkills = [],
  initialSelectedCategory = null,
  allSkillsLive = [],
}) => {
  const [categories, setCategories] = useState([
    { id: "Design/UX", label: "Design / UX" },
    { id: "Development", label: "Development" },
    { id: "Data Science", label: "Data Science" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // const [selectedSkillOption, setSelectedSkillOption] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategorySkills, setSelectedCategorySkills] = useState([]);
  const [categorySkills, setCategorySkills] = useState([]);

  useEffect(() => {
    setSelectedSkills(initialSelectedSkills);
  }, [initialSelectedSkills, show]);

  useEffect(() => {
    if (!categorySkills?.length) return;
    if (!selectedSkills?.length) return;
    const skills = categorySkills
      .filter((skill) => selectedSkills.find((s) => s.name === skill.label))
      .map(({ label }) => ({ value: label, name: label }));
    console.log(skills);
    setSelectedCategorySkills(skills);
  }, [categorySkills, selectedCategory, show, selectedSkills]);

  useEffect(() => {
    if (initialSelectedCategory && initialSelectedCategory.id) {
      setSelectedCategory(
        categories.find((c) => c.id === initialSelectedCategory.id)
      );
    }
  }, [initialSelectedCategory]);

  useEffect(() => {
    if (!allSkills?.length) return;
    if (!allSkillsLive?.length) return;
    let sortedSkill = _.sortBy(allSkills, ["rank", "label"], ["asc", "asc"]);
    sortedSkill = sortedSkill.filter(
      (skill) =>
        !_.isNull(skill.legacyId) &&
        !_.isUndefined(skill.legacyId) &&
        skill.category === selectedCategory.id &&
        allSkillsLive.some((liveSkill) => liveSkill.id === skill.id)
    );
    setCategorySkills(sortedSkill);
  }, [allSkills, allSkillsLive, selectedCategory]);

  const handleCategorySelect = (c) => {
    setSelectedCategory(c);
  };
  const handleSelectedSkillChange = (selectedOption) => {
    let selectedSkill = allSkillsLive.find(
      (skill) => skill.name === selectedOption.value
    );
    setSelectedSkills([...selectedSkills, selectedSkill]);
  };
  const handleSkillRemove = (target) => {
    console.log(target);
    setSelectedSkills(
      selectedSkills.filter((skill) => skill.name !== target.name)
    );
  };
  const handleSkillSelect = (target) => {
    let selectedSkill = allSkillsLive.find(
      (skill) => skill.name === target.name
    );
    setSelectedSkills([...selectedSkills, selectedSkill]);
  };
  const handleSaveClick = (e) => {
    onSkillsSaved(selectedSkills);
    handleClose(e);
    setSelectedSkills([]);
  };
  return (
    <Modal show={show} handleClose={handleClose}>
      <PageH2>Add Skills</PageH2>
      <div styleName="add-skills">
        <div>
          {categories.map((category) => (
            <div
              styleName={cn(
                "category",
                selectedCategory.id === category.id ? "active" : ""
              )}
              onClick={(e) => handleCategorySelect(category)}
            >
              {category.label}
            </div>
          ))}
        </div>
        <div>
          <PageH3 style={{ marginTop: "-5px" }}>
            Select design / ux skills
          </PageH3>
          <Select
            value={null}
            onChange={handleSelectedSkillChange}
            options={categorySkills
              .filter((skill) =>
                !selectedSkills?.find((s) => s.name === skill.label)
              )
              .map(({ label }) => ({ value: label, label }))}
          />
          <div styleName="skills-list">
            {[...selectedCategorySkills].map((skill) => {
              return (
                <div
                  styleName={cn("skill", "selected")}
                  onClick={(e) => {
                    handleSkillRemove(skill);
                  }}
                >
                  {skill.name}
                  <IconCross styleName="skill-remove-icon" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PageDivider />
      <PageFoot>
        <Button
          size={BUTTON_SIZE.MEDIUM}
          disabled={!selectedSkills.length}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </PageFoot>
    </Modal>
  );
};

AddSkillsModal.propTypes = {
  show: PT.bool,
  handleClose: PT.func,
  onSkillsSaved: PT.func,
  initialSelectedSkills: PT.array,
  initialSelectedCategory: PT.object,
  allSkillsLive: PT.array,
};

export default AddSkillsModal;
