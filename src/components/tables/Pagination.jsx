import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem, size } from 'polished';
import screen from 'superior-mq';
import { bp, hover } from 'styles/helpers';
import UnstyledButton from 'components/UnstyledButton';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  font-size: ${rem(18)};
  margin-bottom: 20px;

  ${screen.below(
    bp.portrait,
    `
    justify-content: flex-start;
    margin-left: 10px;
  `
  )}

  ${screen.below(
    bp.mobileMid,
    `
    flex-direction: column;
    align-items: flex-start;
  `
  )}
`;

const Links = styled.ul`
  padding-left: 0;
  margin: 5px 0;
  list-style-type: none;
  text-align: right;

  ${screen.below(
    bp.portrait,
    `
    text-align: left;
  `
  )}

  ${screen.below(
    bp.mobileMid,
    `
    margin-top: 30px;
  `
  )}
`;

const LinkWrap = styled.li`
  display: inline-block;

  &:last-child {
    margin-right: 0;
  }

  button {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    position: relative;
    cursor: pointer;
    color: ${(props) =>
      props.isArrow ? 'var(--primary-green)' : 'var(--dark-text)'};
    font-weight: 600;
    line-height: 32px;

    &[aria-current='page']::before {
      ${size(32)}
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid var(--orange);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    ${(props) =>
      hover(`
      color: ${props.isArrow ? 'var(--dark-green)' : 'var(--primary-green)'};
    `)}
  }

  ${screen.below(
    bp.mobileMid,
    `
    &:first-child {
      margin-left: 0;
    }
  `
  )}
`;

const PageArrow = styled.svg`
  vertical-align: text-bottom;
  width: 9px;
`;

const RightArrow = styled(PageArrow)`
  transform: scaleX(-1);
`;

const RowCountSelect = styled.select`
  margin: 0 auto 0 0;
  display: flex;
  align-items: center;

  label {
    display: inline;
    margin-right: 20px;
  }

  input {
    width: 47px;

    ${screen.below(
      bp.mobileMid,
      `
      font-size: ${rem(16)};
    `
    )}
  }
`;

const PageLink = ({ pageNum, isCurrentPage, onChangePage, ...props }) => (
  <LinkWrap isCurrent={isCurrentPage} {...props}>
    <UnstyledButton
      onClick={() => onChangePage(pageNum)}
      aria-label={`Page ${pageNum}`}
      aria-current={isCurrentPage ? 'page' : null}
    >
      <span>{pageNum}</span>
    </UnstyledButton>
  </LinkWrap>
);

const Pagination = ({
  total = 0,
  limit = 10,
  currentPage,
  onChangePage,
  ...props
}) => {
  const totalPages = Math.ceil(total / limit);

  const pages = [];

  let nextExtent = totalPages <= 3 ? totalPages : 3;
  let backExtent = 1;
  let max = nextExtent;

  if (totalPages > 3 && currentPage >= 2) {
    nextExtent = 1;
    backExtent = currentPage - 1;

    if (totalPages - currentPage < 3) {
      nextExtent = totalPages - currentPage;
      backExtent = currentPage - Math.abs(nextExtent - 3);
    }

    max = currentPage + nextExtent;
  }

  for (let i = backExtent; i <= max; i++) {
    if (i === 1 || i === totalPages) continue;
    pages.push(
      <PageLink
        key={`pagination-page-${i}`}
        pageNum={i}
        isCurrentPage={currentPage === i}
        onChangePage={onChangePage}
      />
    );
  }

  if (total < 6) return null;

  return (
    <Wrap
      {...props}
      style={{
        justifyContent: 'flex-end',
        ...props?.style,
      }}
    >
      {
        // Only show pagination if there are 2 or more pages
        totalPages > 1 ? (
          <Links>
            {currentPage > 1 && (
              <LinkWrap isArrow>
                <UnstyledButton
                  aria-label="Previous Page"
                  onClick={() => onChangePage(currentPage - 1)}
                >
                  <RightArrow
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.29289 13.7071C-0.09763 13.3166 -0.09763 12.6834 0.29289 12.2929L5.5858 7L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289C0.68342 -0.09763 1.3166 -0.09763 1.7071 0.29289L7.7071 6.2929C8.0976 6.6834 8.0976 7.3166 7.7071 7.7071L1.7071 13.7071C1.3166 14.0976 0.68342 14.0976 0.29289 13.7071Z"
                      fill="currentColor"
                    />
                  </RightArrow>
                </UnstyledButton>
              </LinkWrap>
            )}

            <PageLink
              pageNum={1}
              isCurrentPage={currentPage === 1}
              onChangePage={onChangePage}
              style={{ marginRight: '4px' }}
            />

            {currentPage > 3 ? <LinkWrap>...</LinkWrap> : null}

            {pages}

            {currentPage < totalPages - 2 ? <LinkWrap>...</LinkWrap> : null}

            {totalPages > 1 ? (
              <PageLink
                pageNum={totalPages}
                isCurrentPage={currentPage === totalPages}
                onChangePage={onChangePage}
              />
            ) : null}

            {currentPage < totalPages && (
              <LinkWrap isArrow>
                <UnstyledButton
                  onClick={() => onChangePage(currentPage + 1)}
                  aria-label="Next Page"
                >
                  <PageArrow
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.29289 13.7071C-0.09763 13.3166 -0.09763 12.6834 0.29289 12.2929L5.5858 7L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289C0.68342 -0.09763 1.3166 -0.09763 1.7071 0.29289L7.7071 6.2929C8.0976 6.6834 8.0976 7.3166 7.7071 7.7071L1.7071 13.7071C1.3166 14.0976 0.68342 14.0976 0.29289 13.7071Z"
                      fill="currentColor"
                    />
                  </PageArrow>
                </UnstyledButton>
              </LinkWrap>
            )}
          </Links>
        ) : null
      }
    </Wrap>
  );
};

Pagination.propTypes = {
  // The total number of results in the data.
  total: PropTypes.number,
  // The number of results to show per page.
  limit: PropTypes.number.isRequired,
  // A functon that handles changing the page of the associated table.
  onChangePage: PropTypes.func.isRequired,
  // The current page.
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
