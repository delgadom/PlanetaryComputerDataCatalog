import { IButtonStyles, IconButton, Stack } from "@fluentui/react";
import atlas from "azure-maps-control";
import {
  setNextItemPreview,
  setPrevItemPreview,
} from "pages/Explore/state/detailSlice";
import { useExploreDispatch, useExploreSelector } from "pages/Explore/state/hooks";
import React from "react";
import { IStacItem } from "types/stac";
import { ZOOM_DURATION } from "../../hooks/useZoomEvents";

interface PreviewActionBarProps {
  item: IStacItem;
  mapRef: React.MutableRefObject<atlas.Map | null>;
}

export const PreviewActionBar: React.FC<PreviewActionBarProps> = ({
  item,
  mapRef,
}) => {
  const dispatch = useExploreDispatch();
  const { previousZoom, previousCenter } = useExploreSelector(s => s.map);

  const handleSearchExtent = () => {
    mapRef.current?.setCamera({
      zoom: previousZoom,
      center: previousCenter,
      type: "ease",
      duration: ZOOM_DURATION,
    });
  };

  const handleItemExtent = () => {
    mapRef.current?.setCamera({
      bounds: item.bbox,
      type: "ease",
      duration: ZOOM_DURATION,
    });
  };

  const handleNext = () => {
    dispatch(setNextItemPreview());
  };

  const handlePrev = () => {
    dispatch(setPrevItemPreview());
  };

  return (
    <Stack horizontal tokens={{ childrenGap: 2 }} horizontalAlign="center">
      <IconButton
        title="View previous search result item"
        ariaLabel="View previous search result item"
        iconProps={{ iconName: "ChevronLeftMed" }}
        styles={smallIconStyles}
        onClick={handlePrev}
      />
      <IconButton
        title="Zoom to original search extent"
        ariaLabel="Zoom to original search extent"
        iconProps={{ iconName: "FitPage" }}
        styles={iconStyles}
        onClick={handleSearchExtent}
      />
      <IconButton
        title="Zoom to item extent"
        ariaLabel="Zoom to item extent"
        iconProps={{ iconName: "ZoomToFit" }}
        styles={iconStyles}
        onClick={handleItemExtent}
      />
      <IconButton
        title="View next search result item"
        ariaLabel="View next search result item"
        iconProps={{ iconName: "ChevronRightMed" }}
        styles={smallIconStyles}
        onClick={handleNext}
      />
    </Stack>
  );
};

const smallIconStyles: IButtonStyles = {
  icon: {
    fontSize: 13,
  },
};

const iconStyles: IButtonStyles = {
  icon: {
    fontSize: 16,
  },
};
