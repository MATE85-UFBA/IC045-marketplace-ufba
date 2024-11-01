"use client";
import { IconBaseProps } from "react-icons";
import { IconType } from "react-icons";

interface CustomIconProps extends IconBaseProps {
  icon: IconType;
}

export const CustomIcon: React.FC<
  CustomIconProps & React.HTMLProps<SVGElement>
> = ({ icon: Icon, size = 30, ...props }) => <Icon size={size} {...props} />;
